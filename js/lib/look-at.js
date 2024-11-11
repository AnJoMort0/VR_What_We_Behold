/**
 * SOURCE : https://glitch.com/edit/#!/amusing-nervous-jaxartosaurus?path=look-at.js%3A9%3A2
 * from https://stackoverflow.com/questions/66508949/a-frame-make-model-face-the-viewer-center-of-the-screen-or-canvas
 */

AFRAME.registerComponent('look-at', {
    schema: { type: 'selector' },
    
    init: function () {},
  
    tick: function () {
      this.el.object3D.lookAt(this.data.object3D.position)
    }
  })