const page = {
  containerList: [],
};

window.addEventListener("load", () => {
  // 点亮导航
  page.containerList = [...document.querySelectorAll(".main-item.container")];
});

window.addEventListener(
  "scroll",
  debounce(
    (e) => {
      const navList = [...document.querySelectorAll(".nav.link-item")];
      const header = document.querySelector("header");
      const top = document.querySelector("#top");
      const scrollY = Math.ceil(window.scrollY);
      if (!scrollY) {
        header.style.setProperty("box-shadow", "unset");
        navList.forEach((navElement) => {
          navElement.classList.remove("active");
        });

        top.classList.remove("active");

        return;
      }

      header.style.setProperty("box-shadow", "0 -1px 4px rgb(0 0 0 / 15%)");

      top.classList.add("active");

      page.containerList.some((element, index) => {
        const { height } = element.getBoundingClientRect();
        if (scrollY < Math.floor(element.offsetTop + height)) {
          navList.forEach((navElement) => {
            navElement.classList.remove("active");
          });
          navList[index].classList.add("active");
          return true;
        }
      });
    },
    100,
    true
  )
);

/**
 * 防抖
 * @param func
 * @param delay
 * @param immediate
 */
function debounce(func, delay, immediate = false) {
  let timer = null;
  const isDone = immediate;
  return function () {
    //@ts-ignore
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    // 立即触发
    if (immediate) {
      func.apply(context, args);
      immediate = false;
    }
    timer = setTimeout(() => {
      func.apply(context, args);
      if (isDone) {
        immediate = true;
      }
    }, delay);
  };
}
