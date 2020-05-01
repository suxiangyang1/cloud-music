export function selectName(menuList) {
  for (let i = 0; i < menuList.length; i++) {
    let parent = menuList[i]
    for (let j = 0; j < parent.subMenus.length; j++) {
      let child = menuList[i]
      if (child.subMenus[j].path === this.$options.name) {
        this.menus = child.subMenus[j].subMenus
      }
    }
  }
  return this.menus
}
