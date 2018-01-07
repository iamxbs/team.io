const getters = {
  routers: state => state.routers,
  menuList: state => state.menuList,
  tagsList: state => state.tagsList,
  pageOpenedList: state => state.pageOpenedList,
  currentPageName: state => state.currentPageName,
  currentPath: state => state.currentPath,
  openedSubmenuArr: state => state.openedSubmenuArr,
  menuTheme: state => state.menuTheme,
  theme: state => state.theme,
  todayWeather: state => state.todayWeather,
  currentWindowWidth: state => state.currentWindowWidth
};
export default getters
