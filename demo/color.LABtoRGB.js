window.demoDescription = "Create a gradient grid using Lab color space. The pointer position updates the lightness. With subtle wave-like animation.";

(function() {

  Pts.namespace( this );

  var space = new CanvasSpace("#pt").setup({bgcolor: "#96bfed", resize: true, retina: true});
  var form = space.getForm();


  //// Demo code ---

  var grid = [];

  // Lab max value range (100, 127, 127)
  let cu = Color.lab( Color.maxValues("lab") );

  function init() {
    let ratio = space.size.x/space.size.y;
    grid = Create.gridCells( space.innerBound, 20*ratio, 20 );    
  }


  space.add({ 
    start: init,
    resize: init,

    animate: (time, ftime) => {

      // get LAB color string, given a point position
      let color = (p) => {
        let p1 = p.$divide(space.size);
        let p2 = space.pointer.$divide(space.size);
        let c1 = cu.$multiply( Pt.make( 4, 1 ).to( p2.x, p1.x-0.5, p1.y-0.5 ) );
        return Color.LABtoRGB( c1 ).toString("rgb");
      }

      for (let i=0, len=grid.length; i<len; i++) {
        grid[i][1].ceil();
        let c = grid[i].interpolate( Num.cycle( (time+i*60)%1000/1000 ) );
        form.fillOnly( color( c ) ).rect( grid[i] );
      }
    },

    
  });

  //// ----
  

  space.bindMouse().bindTouch().play();

})();