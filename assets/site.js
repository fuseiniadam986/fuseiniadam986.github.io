document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const siteUrl = "https://fuseiniadam986.github.io";
const pageUrl = `${siteUrl}${window.location.pathname}`;
const title = document.title.split("｜")[0].trim();
const description = document.querySelector('meta[name="description"]')?.content || "";

const pathLabels = {
  "/guides/": "采购指南",
  "/guides/hong-kong-server/": "香港服务器选型",
  "/guides/hong-kong-cn2-bgp/": "香港服务器线路",
  "/guides/hong-kong-server-cost/": "成本与续费",
  "/guides/hong-kong-bandwidth/": "带宽与线路",
  "/guides/cloud-quote-checklist/": "报价核对",
  "/guides/hong-kong-server-migration/": "迁移准备",
  "/guides/server-region-comparison/": "服务器地域",
  "/guides/cloud-vendor-comparison/": "云厂商选择",
  "/tools/bandwidth-calculator/": "带宽估算器",
  "/about/": "关于聚搜云"
};

const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "聚搜云（深圳）信息有限公司",
  alternateName: "聚搜云",
  url: "https://www.jusou.net/",
  logo: `${siteUrl}/assets/header_logo.png`
};

const graph = [
  organization,
  {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: "聚搜云服务器采购指南",
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "zh-CN"
  }
];

if (document.querySelector(".article-card")) {
  const dateText = document.querySelector(".article-meta")?.textContent || "";
  const dateModified = dateText.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  graph.push({
    "@type": "Article",
    headline: document.querySelector("h1")?.textContent.trim() || title,
    description,
    mainEntityOfPage: pageUrl,
    image: `${siteUrl}/assets/hong-kong-cloud-hero.webp`,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    datePublished: dateModified,
    dateModified,
    inLanguage: "zh-CN"
  });
}

const pathLabel = pathLabels[window.location.pathname];
if (pathLabel && window.location.pathname !== "/") {
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "首页", item: `${siteUrl}/` }
  ];
  const visibleItems = [{ name: "首页", href: "/" }];

  if (window.location.pathname.startsWith("/guides/") && window.location.pathname !== "/guides/") {
    breadcrumbItems.push({ "@type": "ListItem", position: 2, name: "采购指南", item: `${siteUrl}/guides/` });
    visibleItems.push({ name: "采购指南", href: "/guides/" });
  }

  breadcrumbItems.push({ "@type": "ListItem", position: breadcrumbItems.length + 1, name: pathLabel, item: pageUrl });
  visibleItems.push({ name: pathLabel, href: window.location.pathname });
  graph.push({ "@type": "BreadcrumbList", itemListElement: breadcrumbItems });

  const main = document.querySelector("main");
  if (main) {
    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "breadcrumb";
    breadcrumb.setAttribute("aria-label", "面包屑导航");
    breadcrumb.innerHTML = `<div class="container">${visibleItems.map((item, index) => index === visibleItems.length - 1 ? `<span aria-current="page">${item.name}</span>` : `<a href="${item.href}">${item.name}</a><b>/</b>`).join("")}</div>`;
    main.prepend(breadcrumb);
  }
}

const schema = document.createElement("script");
schema.type = "application/ld+json";
schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
document.head.append(schema);

document.querySelectorAll(".site-footer .container").forEach((footer) => {
  const links = document.createElement("nav");
  links.className = "footer-links";
  links.setAttribute("aria-label", "网站信息");
  links.innerHTML = '<a href="/about/">关于聚搜云</a><a href="https://www.jusou.net/" rel="noopener">聚搜云官网</a><a href="/guides/">采购指南</a><a href="/tools/bandwidth-calculator/">带宽估算器</a>';
  footer.append(links);
});

const calculator = document.querySelector("[data-bandwidth-calculator]");
if (calculator) {
  const fields = {
    size: calculator.querySelector('[name="page-size"]'),
    visits: calculator.querySelector('[name="peak-visits"]'),
    offload: calculator.querySelector('[name="offload"]'),
    reserve: calculator.querySelector('[name="reserve"]')
  };
  const result = calculator.querySelector("[data-result]");
  const recommendation = calculator.querySelector("[data-recommendation]");

  const updateCalculator = () => {
    const size = Math.max(0, Number(fields.size.value) || 0);
    const visits = Math.max(0, Number(fields.visits.value) || 0);
    const offload = Math.min(100, Math.max(0, Number(fields.offload.value) || 0));
    const reserve = Math.max(0, Number(fields.reserve.value) || 0);
    const mbps = size * 8 * (visits / 60) * (1 - offload / 100) * (1 + reserve / 100);
    const rounded = Math.max(0.1, Math.round(mbps * 10) / 10);
    const tier = rounded <= 3 ? "建议从 5 Mbps 档位测试" : rounded <= 7 ? "建议从 10 Mbps 档位测试" : rounded <= 15 ? "建议从 20 Mbps 档位测试" : "建议评估 30 Mbps 以上带宽或 CDN";
    result.textContent = `${rounded} Mbps`;
    recommendation.textContent = tier;
  };

  Object.values(fields).forEach((field) => field.addEventListener("input", updateCalculator));
  updateCalculator();
}
