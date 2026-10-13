import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";


function FacebookEmbed() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inView && window.FB) {
      window.FB.XFBML.parse();
      setTimeout(() => setLoaded(true), 100); 
    }
  }, [inView]);

  return (
    <div className="facebook-embed-wrapper" ref={ref}>
      {!loaded && (
        <div className="fb-loader">
          <div className="fb-loader-bar" />
        </div>
      )}

      {inView && (
        <div
          className="fb-post"
          data-href="https://www.facebook.com/permalink.php?story_fbid=pfbid02UUGGg92vNdvWxJsfDnQ7MzobD1mrAiiSrMbvVSiQj8QTkjVMTzohL4VpdPmw9znPl&id=61565098034933"
          data-width="100%"
          data-show-text="true"
        ></div>
      )}
    </div>
  );
}

export default FacebookEmbed;
