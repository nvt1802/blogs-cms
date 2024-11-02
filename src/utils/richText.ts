import { OutputBlockData, OutputData } from "@editorjs/editorjs";

export const convertEditorDataToHTML = (data: OutputBlockData[]) => {
  return data
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${block.data.text}</p>`;
        case "header":
          return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        case "list":
          const listItems = block.data.items
            .map((item: string) => `<li>${item}</li>`)
            .join("");
          return block.data.style === "ordered"
            ? `<ol>${listItems}</ol>`
            : `<ul>${listItems}</ul>`;
        case "image":
          return `<img src="${block.data.url}" alt="${block.data.caption}" />`;
        case "quote":
          return `<blockquote>${block.data.text}<footer>${block.data.caption}</footer></blockquote>`;
        case "code":
          return `<pre><code>${block.data.code}</code></pre>`;
        case "embed":
          return `<iframe src="${block.data.embed}" width="${block.data.width}" height="${block.data.height}" frameborder="0" allowfullscreen></iframe>`;
        case "table":
          const rows = block.data.content
            .map(
              (row: string[]) =>
                `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
            )
            .join("");
          return `<table>${rows}</table>`;
        case "delimiter":
          return `<hr />`;
        case "marker":
          return `<mark>${block.data.text}</mark>`;
        case "checklist":
          const checklistItems = block.data.items
            .map(
              (item: { text: string; checked: boolean }) =>
                `<div><input type="checkbox" ${
                  item.checked ? "checked" : ""
                } /> ${item.text}</div>`
            )
            .join("");
          return `<div>${checklistItems}</div>`;
        case "warning":
          return `<div class="warning"><strong>${block.data.title}</strong>: ${block.data.message}</div>`;
        case "linkTool":
          return `<a href="${block.data.link}" target="_blank">${block.data.meta.title}</a>`;
        case "raw":
          return block.data.html;
        case "inlineCode":
          return `<code>${block.data.text}</code>`;
        case "imageSelection":
          return `<figure>
            <img src="${block.data.url}" alt="${block.data?.caption}" style="width: ${block.data?.width}px; height: ${block.data?.height}px" />
            <figcaption>${block.data.caption}</figcaption>
          </figure>`;
        default:
          console.warn(`Unsupported block type: ${block.type}`);
          return "";
      }
    })
    .join("");
};

export const convertHTMLToEditorData = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: OutputBlockData[] = [];
  const response: OutputData = { blocks: [] };

  const parseTextContent = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    const element = node as HTMLElement;
    let content = "";

    element.childNodes.forEach((child) => {
      switch (child.nodeName.toLowerCase()) {
        case "strong":
        case "b":
          content += `<b>${parseTextContent(child)}</b>`;
          break;
        case "em":
        case "i":
          content += `<i>${parseTextContent(child)}</i>`;
          break;
        case "a":
          const link = (child as HTMLAnchorElement).href;
          content += `<a href="${link}">${parseTextContent(child)}</a>`;
          break;
        default:
          content += parseTextContent(child);
      }
    });

    return content;
  };

  doc.body.childNodes.forEach((_) => {
    const node = _ as HTMLElement;
    switch (node.nodeName.toLowerCase()) {
      case "p":
        blocks.push({
          type: "paragraph",
          data: {
            text: parseTextContent(node),
          },
        });
        break;

      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        const level = parseInt(node.nodeName[1]);
        blocks.push({
          type: "header",
          data: {
            text: parseTextContent(node),
            level: level,
          },
        });
        break;

      case "ol":
      case "ul":
        const items = Array.from(node.children).map((li) =>
          parseTextContent(li)
        );
        blocks.push({
          type: "list",
          data: {
            style: node.nodeName === "OL" ? "ordered" : "unordered",
            items: items,
          },
        });
        break;

      case "img":
        blocks.push({
          type: "image",
          data: {
            url: (node as HTMLImageElement).src,
            caption: (node as HTMLImageElement).alt || "",
          },
        });
        break;

      case "blockquote":
        blocks.push({
          type: "quote",
          data: {
            text: parseTextContent(node),
            caption: node.querySelector("footer")?.textContent || "",
          },
        });
        break;

      case "pre":
        const code = node.querySelector("code")?.textContent || "";
        blocks.push({
          type: "code",
          data: {
            code: code,
          },
        });
        break;

      case "iframe":
        blocks.push({
          type: "embed",
          data: {
            embed: (node as HTMLIFrameElement).src,
            width: (node as HTMLIFrameElement).width,
            height: (node as HTMLIFrameElement).height,
          },
        });
        break;

      case "table":
        const content = Array.from(node.querySelectorAll("tr")).map((tr) =>
          Array.from(tr.querySelectorAll("td")).map(
            (td) => td.textContent || ""
          )
        );
        blocks.push({
          type: "table",
          data: {
            content: content,
          },
        });
        break;

      case "hr":
        blocks.push({
          type: "delimiter",
          data: {},
        });
        break;

      case "mark":
        blocks.push({
          type: "marker",
          data: {
            text: parseTextContent(node),
          },
        });
        break;

      case "a":
        blocks.push({
          type: "linkTool",
          data: {
            link: (node as HTMLAnchorElement).href,
            meta: {
              title: parseTextContent(node),
            },
          },
        });
        break;

      case "code":
        blocks.push({
          type: "inlineCode",
          data: {
            text: node.textContent || "",
          },
        });
        break;

      case "figure":
        const img = node.querySelector("img");
        const caption = node.querySelector("figcaption")?.textContent || "";
        if (img) {
          blocks.push({
            type: "imageSelection",
            data: {
              url: img.src,
              caption: caption,
              width: img.style.width?.replace("px", ""),
              height: img.style.height?.replace("px", ""),
            },
          });
        }
        break;

      default:
        console.warn(`Unsupported HTML element: ${node.nodeName}`);
    }
  });

  response.blocks = blocks;

  return response;
};
