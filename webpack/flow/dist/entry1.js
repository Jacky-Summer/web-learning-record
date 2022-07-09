
   (() => {
    var modules = {
      
        "./src/title.js": (module) => {
          module.exports = 'title'; //logger2//logger1
        },
        
    };
    var cache = {};
    function require(moduleId) {
      var cachedModule = cache[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = (cache[moduleId] = {
        exports: {},
      });
      modules[moduleId](module, module.exports, require);
      return module.exports;
    }
    var exports ={};
    const title = require("./src/title.js");

console.log('entry1', title); //logger2//logger1
  })();
  
   