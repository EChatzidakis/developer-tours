/**
 * receives the default link for an image and 
 * customizes it for each hotel, room
 * @param {Array} imgArray 
 * @param {string} hotelId 
 * @returns Array
 */
export const HandleImageLinks = (imgArray, hotelId) => {

    const _imgArray = imgArray;
    if (_imgArray === undefined) {
        return [{ url: '' }];
    }

    const lowresLinksArray = _imgArray.map((img, key) => {
        const urlSliced = img.lowres.split(',');
        const url = urlSliced[0] + '=' + hotelId + ',' + urlSliced[1] + '=' + _imgArray.id + ',' + key;
        return { url: url };
    });
    return lowresLinksArray;
};
