/**
 * @author Jörn Kreutel
 */
import {GenericCRUDImplLocal, mwf} from "vfh-iam-mwf-base";
import {mwfUtils} from "vfh-iam-mwf-base";
import * as entities from "../model/MyEntities.js";

export default class ListviewViewController extends mwf.ViewController {

    // instance attributes set by mwf after instantiation
    args;
    root;
    // TODO-REPEATED: declare custom instance attributes for this controller

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view
        const addNewElementAction = this.root.querySelector("header .mwf-img-plus");
        addNewElementAction.onclick = () => {
            const newMediaItem = new entities.MediaItem("new", "https://picsum.photos/100/100");
            this.crudops.create(newMediaItem).then(created => this.addToListview(created));
        }

        this.crudops.readAll().then(items => this.initialiseListview(items));

        // call the superclass once creation is done
        super.oncreate();
    }


    constructor() {
        super();

        this.crudops = GenericCRUDImplLocal.newInstance("MediaItem");

        console.log("ListviewViewController()");
    }

    /*
     * for views that initiate transitions to other views
     * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view. Otherwise, do not return anything.
     */
    async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
        // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
    }

    /*
     * for views with listviews: bind a list item to an item view
     * TODO: delete if no listview is used or if databinding uses ractive templates
     */
    /*bindListItemView(listviewid, itemview, itemobj) {
        // TODO: implement how attributes of itemobj shall be displayed in itemview
        itemview.root.querySelector("img").src = itemobj.src;
        itemview.root.querySelector("h2").textContent = itemobj.title;
        itemview.root.querySelector("h3").textContent = itemobj.added;
    }*/

    /*
     * for views with listviews: react to the selection of a listitem
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    onListItemSelected(itemobj, listviewid) {
        // TODO: implement how selection of itemobj shall be handled
        alert(`selected: " ${itemobj.title}`);
    }

    /*
     * for views with listviews: react to the selection of a listitem menu option
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    /*onListItemMenuItemSelected(menuitemview, itemobj, listview) {
        // TODO: implement how selection of the option menuitemview for itemobj shall be handled
    }*/

    /*
     * for views with dialogs
     * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
     */
    bindDialog(dialogid, dialogview, dialogdataobj) {
        // call the supertype function
        super.bindDialog(dialogid, dialogview, dialogdataobj);

        // TODO: implement action bindings for dialog, accessing dialog.root
    }

    editItem(item) {
        item.title += (" "  + item.title);
        this.crudops.update(item._id, item).then(() => this.updateInListview(item._id, item));
    }

    deleteItem(item) {
        this.crudops.delete(item._id).then(() => this.removeFromListview(item._id));
    }

}
