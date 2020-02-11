function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.src = url;
    });
}

export async function loadImages() {
    const resources = new Map;
    const promises = [];

    [
        '/images/background.jpg'
    ].forEach(url => {
        promises.push(loadImage(url).then((image) => resources.set(url, image)));
    });

    await Promise.all(promises);
    return resources;
}