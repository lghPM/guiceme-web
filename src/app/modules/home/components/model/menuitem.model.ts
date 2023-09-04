export class MenuItem {
  id: string;
  text: string;
  //action: string;
  icon: string;
  menuFatherId: string;
  //children:any[];
  children:MenuItemChild[];
  //opacity:any;
  isCollapsed:any;
}

export class MenuItemChild {
  id: string;
  text: string;
  menuFatherId: string;
  children:[];
}
