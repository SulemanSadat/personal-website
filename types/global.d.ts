interface FacebookSDK {
  XFBML: {
    parse(): void;
  };
}

interface Window {
  FB?: FacebookSDK;
}
