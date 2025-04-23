// Intercom service for React
const initIntercom = (userData = null) => {
  const defaultSettings = {
    api_base: "https://api-iam.intercom.io",
    app_id: "mthemgos",
    name: "Officer K9", // Default name
    user_id: "123", // Default user ID
    email: "bigdog@example.com", // Default email
    created_at: Math.round(Date.now() / 1000) // Signup date as a Unix timestamp
  };

  // If user data is provided, override defaults
  const settings = userData ? { ...defaultSettings, ...userData } : defaultSettings;
  
  // Set Intercom settings
  window.intercomSettings = settings;

  // Initialize Intercom
  (function(){
    var w=window;
    var ic=w.Intercom;
    if(typeof ic==="function"){
      ic('reattach_activator');
      ic('update',w.intercomSettings);
    } else {
      var d=document;
      var i=function(){i.c(arguments);};
      i.q=[];
      i.c=function(args){i.q.push(args);};
      w.Intercom=i;
      var l=function(){
        var s=d.createElement('script');
        s.type='text/javascript';
        s.async=true;
        s.src='https://widget.intercom.io/widget/' + w.intercomSettings.app_id;
        var x=d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s,x);
      };
      if(document.readyState==='complete'){
        l();
      } else if(w.attachEvent){
        w.attachEvent('onload',l);
      } else {
        w.addEventListener('load',l,false);
      }
    }
  })();
};

// Update Intercom with user data
const updateIntercom = (userData) => {
  if (window.Intercom) {
    window.Intercom('update', userData);
  }
};

// Shutdown Intercom session
const shutdownIntercom = () => {
  if (window.Intercom) {
    window.Intercom('shutdown');
  }
};

export { initIntercom, updateIntercom, shutdownIntercom };
