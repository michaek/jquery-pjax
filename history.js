(function($, undefined){
  
  $.history = {
    root: '/',
    prefix: '!',
  
    length: 0,
    state: null,
    
    stateOptions: {},

    go: window.history.go,
    back: window.history.back,
    forward: window.history.forward,
    
    changeCallback: function(state){},
  
    urlToRelative: function(url){
      return url.replace(/^(?:\/\/|[^\/]+)*\//, '')
    },
  
    urlToFragment: function(url){
      var url = this.urlToRelative(url)
      return (url == '') ? this.root+'#' : this.root+'#'+this.prefix+url
    },
    
    fragmentToUrl: function(fragment){
      var regex = new RegExp('^#'+this.prefix, 'g')
      return fragment.replace(regex, '')
    },

    pushState: function(data, title, url){
      window.location.href = this.urlToFragment(url)
      this.length++
    },

    replaceState: function(data, title, url){
      if (url != undefined) {
        window.location.replace(this.urlToFragment(url))
      }
    },
  
    popState: function(){
      this.length--
    }
  }

  $(function(){

    $(window).hashchange( function(){
      var url = $.history.fragmentToUrl(location.hash)
      
      var state = $.extend({}, $.history.stateOptions, {url: url})
      
      // TODO: This check suggests sloppiness elsewhere.
      if (this.state == null || this.state.url != state.url) {
        $.history.changeCallback(state);
        // $.pjax_popstate(state)
        this.state = state
      }
    })

  })
  
})(jQuery)
