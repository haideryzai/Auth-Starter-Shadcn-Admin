(() => {
  let selectedElements = {};
  let currentStep = 0;

  const steps = window.parent.steps || [
    { name: "Product Name", key: "name" },
    { name: "Product Price", key: "price" },
    { name: "Product Description", key: "description" },
    { name: "Product Images", key: "images" },
  ];

  const guideBox = document.createElement("div");
  guideBox.style.position = "fixed";
  guideBox.style.bottom = "10px";
  guideBox.style.right = "10px";
  guideBox.style.width = "300px";
  guideBox.style.background = "rgba(0, 0, 0, 0.8)";
  guideBox.style.color = "white";
  guideBox.style.padding = "10px";
  guideBox.style.borderRadius = "8px";
  guideBox.style.fontSize = "14px";
  guideBox.style.zIndex = "10000";
  guideBox.innerHTML = `<h4 style="margin-bottom: 10px;">Element Selection</h4>
                        <div id="guide-current">Now select: <b>${steps[0].name}</b></div>
                        <ul id="guide-steps" style="margin-top: 10px; padding-left: 20px;"></ul>`;
  document.body.appendChild(guideBox);

  const updateGuideBox = () => {
    document.getElementById("guide-current").innerHTML = 
      currentStep < steps.length
        ? `Now select: <b>${steps[currentStep].name}</b>`
        : "Selection Complete!";

    const stepsList = document.getElementById("guide-steps");
    stepsList.innerHTML = Object.entries(selectedElements)
      .map(([key, selector]) => `<li>${steps.find(s => s.key === key).name}: <code>${selector}</code></li>`)
      .join("");
  };

  const highlightElement = (element, color) => {
    element.style.outline = color ? `2px dashed ${color}` : "";
  };

  const generateCSSSelector = (element) => {
    const path = [];
    while (element.parentElement) {
      let selector = element.tagName.toLowerCase();
      if (element.id) {
        selector += `#${element.id}`;
        path.unshift(selector);
        break;
      } else {
        let sibling = element;
        let nth = 1;
        while ((sibling = sibling.previousElementSibling)) {
          if (sibling.tagName === element.tagName) nth++;
        }
        if (nth !== 1) selector += `:nth-of-type(${nth})`;
      }
      path.unshift(selector);
      element = element.parentElement;
    }
    return path.join(" > ");
  };

  document.addEventListener("mouseover", (event) => {
    highlightElement(event.target, "blue");
  });

  document.addEventListener("mouseout", (event) => {
    highlightElement(event.target, "");
  });

  document.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target;
    const cssSelector = generateCSSSelector(element);
    const step = steps[currentStep];

    highlightElement(element, "red");
    selectedElements[step.key] = cssSelector;
    currentStep++;

    updateGuideBox();

    if (currentStep >= steps.length) {
      window.parent.postMessage({ type: "selectionComplete", selectors: selectedElements }, "*");
    } else {
      window.parent.postMessage({ type: "stepCompleted", step: step.key, cssSelector }, "*");
    }
  });

  updateGuideBox();
})();
