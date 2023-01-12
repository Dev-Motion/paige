export default function preloadImages(images: string[]) {
  images.forEach((image) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = image;
    link.as = "image";
    document.head.appendChild(link);
  });
}
