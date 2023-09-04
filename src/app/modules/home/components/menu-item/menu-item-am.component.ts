import { Component, Input } from "@angular/core";
import { GeneralComponent } from "src/app/modules/general/general.component";

@Component({
  selector: "app-menu-item-am",
  templateUrl: "./menu-item-am.component.html",
  styleUrls: ["./menu-item-am.component.css"],
})
export class MenuItemAMComponent extends GeneralComponent{
  @Input("menuitem") menuitem;
  style;
  styleLink;
  ngOnInit(): void {
    // this.menuitem;
    this.style = {
      "background-color": `rgb(155,155,155,${this.menuitem.opacity/10})`,
    };
    this.styleLink = {
      "background-color": `rgb(155,155,155,${this.menuitem.opacity+1/10})`,
    };
  }
}
