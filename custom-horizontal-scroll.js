// const template = document.createElement('template');
// template.innerHTML = `
// <main>
//   <section>
//     <h1>Beep</h1>
//   </section>
//   <section>
//     <h1>Boop</h1>
//   </section>
//   <section>
//     <h1>Boooom</h1>
//   </section>
//     <section>
//     <h1>The End</h1>
//   </section>
// </main>
// <style>
// main {
//   overflow-x: hidden;
//   display: flex;
// }

// h1 {
//   margin: 0;
//   padding: 0;
// }

// section {
//   min-width: 50vw;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 4ch;
// }

// section:nth-child(even) {
//   background-color: teal;
//   color: white;
// }
// </style>`;

// class HelloWorld extends HTMLElement {
//   constructor() {
//     super()
//     this.addEventListener('wheel', e => {
//       e.preventDefault();
//       this.querySelector('main').scrollLeft += e.deltaY;
//     })
//   }

//   connectedCallback() {
//     this.appendChild(template.content.cloneNode(true));
//   }
// }
// customElements.define('hello-world', HelloWorld);
const template = document.createElement('template');
template.innerHTML = `
<div class="sticky-container">
  <main>
    <section>
      <h1>Beep</h1>
    </section>
    <section>
      <h1>Baap</h1>
    </section>
    <section>
      <h1>iBoop</h1>
    </section>
    <section>
      <h1>Boooom</h1>
    </section>
    <section>
      <h1>The End</h1>
    </section>
  </main>
</div>
<style>
main {
  overflow-x: hidden;
  display: flex;
  position: sticky;
  top:0;
}

h1 {
  margin: 0;
  padding: 0;
}

section {
  min-width: 50vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4ch;
}

section:nth-child(even) {
  background-color: teal;
  color: white;
}
</style>`;

class HorizontalScroll extends HTMLElement {

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));

    this.addEventListener('wheel', e => wheelHandler(e, this))
    setStickyContainersSize(this)

    function isElementInViewport (el) {
      const rect = el.getBoundingClientRect();
      return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }

    function setStickyContainersSize(ctx){
      ctx.querySelectorAll('.sticky-container').forEach(function(container){
          const stikyContainerHeight = (container.querySelector('main').offsetWidth + window.innerHeight);
          container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
      });
    }

    function wheelHandler(evt, ctx){
      const containerInViewPort = Array.from(ctx.querySelectorAll('.sticky-container')).filter((container) => {
          return isElementInViewport(container);
      })[0];

      if(!containerInViewPort){
          return;
      }

      var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
      var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
      let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

      if(g_canScrollHorizontally){
          containerInViewPort.querySelector('main').scrollLeft += evt.deltaY;
      }
    }
  }
}
customElements.define('custom-horizontal-scroll', HorizontalScroll);