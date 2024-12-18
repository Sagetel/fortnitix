export interface IFavoritesState {
  favorites: ShopItem[];
  error: null | string;
}

export enum FavoritesActionTypes {
  CREATE_FAVORITE = "CREATE_FAVORITE",
  CREATE_FAVORITE_ERROR = "CREATE_FAVORITE_ERROR",
  GET_FAVORITE = "GET_FAVORITE",
  GET_FAVORITE_ERROR = "GET_FAVORITE_ERROR",
  DELETE_FAVORITE = "DELETE_FAVORITE",
  DELETE_FAVORITE_ERROR = "DELETE_FAVORITE_ERROR",
}

export interface IFavoritesAction {
  type: FavoritesActionTypes;
  payload: any;
}

interface ICreateFavoriteAction {
  type: FavoritesActionTypes.CREATE_FAVORITE;
  payload: ShopItem;
}

interface ICreateFavoriteErrorAction {
  type: FavoritesActionTypes.CREATE_FAVORITE_ERROR;
  payload: any;
}

interface IGetFavoriteAction {
  type: FavoritesActionTypes.GET_FAVORITE;
  payload: ShopItem[];
}

interface IGetFavoriteErrorAction {
  type: FavoritesActionTypes.GET_FAVORITE_ERROR;
  payload: any;
}
interface IDeleteFavoriteAction {
  type: FavoritesActionTypes.DELETE_FAVORITE;
  payload: any;
}
interface IDeleteFavoriteErrorAction {
  type: FavoritesActionTypes.DELETE_FAVORITE_ERROR;
  payload: any;
}

export type TFavoritesAction =
  | ICreateFavoriteAction
  | ICreateFavoriteErrorAction
  | IGetFavoriteAction
  | IGetFavoriteErrorAction
  | IDeleteFavoriteAction
  | IDeleteFavoriteErrorAction

export interface userState {
  userEmail: string;
  userIsLogedIn: boolean;
  userUId: string;
  error: null | string;
}

export enum UserActionTypes {
  LOGIN = "LOGIN",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGOUT = "LOGOUT",
}

export interface IUserAction {
  type: UserActionTypes;
  payload: any;
}

interface IUserLoginAction {
  type: UserActionTypes.LOGIN;
  payload: string;
}

interface IUserLoginErrorAction {
  type: UserActionTypes.LOGIN_ERROR;
  payload: string;
}

interface IUserLogoutAction {
  type: UserActionTypes.LOGOUT;
  payload: null | string;
}

export type TUserAction =
  | IUserAction
  | IUserLoginAction
  | IUserLoginErrorAction
  | IUserLogoutAction;

// skins types

export interface Price {
  floorPrice: number;
  finalPrice: number;
  regularPrice: number;
}

export interface Rarity {
  id: string;
  name: string;
}

export interface DisplayAsset {
  displayAsset: string;
  materialInstance: string;
  url: string;
  flipbook: string;
  background_texture: string;
  background: string;
  full_background: string;
}

export interface GrantedItem {
  id: string;
  type: { name: string; id: string };
  name: string;
  description: string;
  rarity: Rarity;
  series: string;
  price: number;
  added: { version: string; date: string };
  builtInEmote: string;
  copyrightedAudio: boolean;
  upcoming: boolean;
  reactive: boolean;
  releaseDate: string;
  lastAppearance: string;
  interest: number;
  images: {
    full_background: string;
    icon_background: string;
    background: string;
    featured: string;
    icon: string;
  };
  video: string;
  audio: string;
  gameplayTags: string[];
  apiTags: string[];
  searchTags: string[];
  battlepass: string;
  set: string;
  introduction: string;
  displayAssets: DisplayAsset[];
  shopHistory: string[];
  styles: {
    name: string;
    channel: string;
    channelName: string;
    tag: string;
    isDefault: boolean;
    startUnlocked: boolean;
    hideIfNotOwned: boolean;
    image: string;
  }[];
  grants: string[];
  grantedBy: string[];
}

export interface ShopItem {
  mainId: string;
  displayName: string;
  displayDescription: string;
  displayType: string;
  mainType: string;
  offerId: string;
  devName: string;
  offerDates: { out: string; in: string };
  colors: {
    textBackgroundColor: string;
    color3: string;
    color2: string;
    color1: string;
  };
  displayAssets: DisplayAsset[];
  firstReleaseDate: string;
  previousReleaseDate: string;
  giftAllowed: boolean;
  buyAllowed: boolean;
  price: Price;
  rarity: Rarity;
  series: string;
  banner: { intensity: string; name: string; id: string };
  offerTag: string;
  granted: GrantedItem[];
}

export interface SkinState {
  shop: ShopItem[];
  loading: boolean;
  error: string | null;
}

export enum ShopActionTypes {
  FETCH_SHOP_REQUEST = "FETCH_SHOP_REQUEST",
  FETCH_SHOP_SUCCESS = "FETCH_SHOP_SUCCESS",
  FETCH_SHOP_FAILURE = "FETCH_SHOP_FAILURE",
}

export interface IFetchShopRequestAction {
  type: ShopActionTypes.FETCH_SHOP_REQUEST;
  payload: null;
}

export interface IFetchShopSuccessAction {
  type: ShopActionTypes.FETCH_SHOP_SUCCESS;
  payload: ShopItem[];
}

export interface IFetchShopFailureAction {
  type: ShopActionTypes.FETCH_SHOP_FAILURE;
  payload: string;
}

export type ShopAction =
  | IFetchShopRequestAction
  | IFetchShopSuccessAction
  | IFetchShopFailureAction;

// api types

export interface ApiResponse {
  result: boolean;
  fullShop: boolean;
  lastUpdate: { uid: string; date: string };
  currentRotation: string;
  nextRotation: string;
  carousel: string;
  specialOfferVideo: string;
  customBackground: string;
  shop: ShopItem[];
}

export interface LoginPayload {
  email: string;
  uid: string;
}

// filter types

export interface FilterConfig {
  label: string;
  key: string;
  uniqueValues: string[];
}

export enum FilterActionTypes {
  SET_FILTER = "SET_FILTER",
  RESET_FILTERS = "RESET_FILTERS",
}

export interface ISetFiltersAction {
  type: FilterActionTypes.SET_FILTER;
  payload: {
    key: string;
    value: string;
  };
}

export interface IResetFiltersAction {
  type: FilterActionTypes.RESET_FILTERS;
}

export type FilterAction = ISetFiltersAction | IResetFiltersAction;

export interface FiltersType {
  rarity?: string;
  mainType?: string;
  buyAllowed?: string;
}

// history

export enum HistoryActionTypes {
  ADD_SEARCH_HISTORY = "ADD_SEARCH_HISTORY",
  LOAD_SEARCH_HISTORY = "LOAD_SEARCH_HISTORY",
}

export interface IAddSearchHistoryAction {
  type: HistoryActionTypes.ADD_SEARCH_HISTORY;
  payload: { query: string; filters: FiltersType };
}

export interface ILoadSearchHistoryAction {
  type: HistoryActionTypes.LOAD_SEARCH_HISTORY;
}

export type HistoryAction = IAddSearchHistoryAction | ILoadSearchHistoryAction;
