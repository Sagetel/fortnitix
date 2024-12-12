import axios from 'axios';
import { ApiResponse, ShopItem } from './types';

const API_URL = 'https://fortniteapi.io/v2/shop';
const API_KEY = '74b5dc1b-215742d3-619c95c0-6d55ae46';

export const fetchShop = async (lang: string = 'ru'): Promise<ShopItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL, {
      headers: {
        'Authorization': API_KEY,
      },
      params: {
        lang,
        includeRenderData: true,
        includeHiddenTabs: true,
        limit: 1,
      },
    });

    if (!response.data || !response.data.shop) {
      throw new Error('Нет данных от API');
    }

    return response.data.shop;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ошибка при получении данных:', error);
      throw new Error(error.message || 'Ошибка при получении данных');
    } else {
      console.error('Неизвестная ошибка:', error);
      throw new Error('Неизвестная ошибка');
    }
  }
};


// Docs https://fortniteapi.io/docs/#/Free/GetShop

// Example Status 200 Daily Shop

// {
//   "result": true,
//   "fullShop": true,
//   "lastUpdate": {
//     "uid": "string",
//     "date": "string"
//   },
//   "currentRotation": "string",
//   "nextRotation": "string",
//   "carousel": "string",
//   "specialOfferVideo": "string",
//   "customBackground": "string",
//   "shop": [                                      // shop - main object
//     {
//       "mainId": "string",
//       "displayName": "string",
//       "displayDescription": "string",
//       "displayType": "string",
//       "mainType": "string",
//       "offerId": "string",
//       "devName": "string",
//       "offerDates": {
//         "out": "string",
//         "in": "string"
//       },
//       "colors": {
//         "textBackgroundColor": "string",
//         "color3": "string",
//         "color2": "string",
//         "color1": "string"
//       },
//       "displayAssets": [
//         {
//           "displayAsset": "string",
//           "materialInstance": "string",
//           "url": "string",
//           "flipbook": "string",
//           "background_texture": "string",
//           "background": "string",
//           "full_background": "string"
//         }
//       ],
//       "firstReleaseDate": "string",
//       "previousReleaseDate": "string",
//       "giftAllowed": true,
//       "buyAllowed": true,
//       "price": {
//         "floorPrice": 0,
//         "finalPrice": 0,
//         "regularPrice": 0
//       },
//       "rarity": {
//         "id": "string",
//         "name": "string"
//       },
//       "series": "string",
//       "banner": {
//         "intensity": "string",
//         "name": "string",
//         "id": "string"
//       },
//       "offerTag": "string",
//       "granted": [
//         {
//           "id": "string",
//           "type": {
//             "name": "string",
//             "id": "string"
//           },
//           "name": "string",
//           "description": "string",
//           "rarity": {
//             "id": "string",
//             "name": "string"
//           },
//           "series": "string",
//           "price": 0,
//           "added": {
//             "version": "string",
//             "date": "string"
//           },
//           "builtInEmote": "string",
//           "copyrightedAudio": true,
//           "upcoming": true,
//           "reactive": true,
//           "releaseDate": "string",
//           "lastAppearance": "string",
//           "interest": 0,
//           "images": {
//             "full_background": "string",
//             "icon_background": "string",
//             "background": "string",
//             "featured": "string",
//             "icon": "string"
//           },
//           "video": "string",
//           "audio": "string",
//           "gameplayTags": [
//             "string"
//           ],
//           "apiTags": [
//             "string"
//           ],
//           "searchTags": [
//             "string"
//           ],
//           "battlepass": "string",
//           "set": "string",
//           "introduction": "string",
//           "displayAssets": [
//             {
//               "displayAsset": "string",
//               "materialInstance": "string",
//               "url": "string",
//               "flipbook": "string",
//               "background_texture": "string",
//               "background": "string",
//               "full_background": "string"
//             }
//           ],
//           "shopHistory": [
//             "string"
//           ],
//           "styles": [
//             {
//               "name": "string",
//               "channel": "string",
//               "channelName": "string",
//               "tag": "string",
//               "isDefault": true,
//               "startUnlocked": true,
//               "hideIfNotOwned": true,
//               "image": "string"
//             }
//           ],
//           "grants": [
//             "string"
//           ],
//           "grantedBy": [
//             "string"
//           ]
//         }
//       ]
//     }
//   ]
// }