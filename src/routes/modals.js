import LoginModal from "~/modals/login";
import RegisterModal from "~/modals/register";
import BusinessCreateModal from "~/modals/business-create";
import CategoryEditModal from "~/modals/category-edit";
import CategoryDeleteModal from "~/modals/category-delete";
import MenuDeleteModal from "~/modals/menu-delete";
import MenuEditModal from "~/modals/menu-edit";
import FavoritesModal from "~/modals/favorites";

const modals = [
  {
    name: "login",
    title: "Customer Login",
    element: LoginModal,
    force: false,
  },
  {
    name: "register",
    title: "New Customer",
    element: RegisterModal,
    force: false,
  },
  {
    name: "business",
    title: "Create Your Business",
    element: BusinessCreateModal,
    force: true,
  },
  {
    name: "category-edit",
    title: "Edit Category",
    element: CategoryEditModal,
    force: false,
  },
  {
    name: "category-delete",
    title: "Delete Category",
    element: CategoryDeleteModal,
    force: false,
  },
  {
    name: "menu-edit",
    title: "Edit Menu",
    element: MenuEditModal,
    force: false,
  },
  {
    name: "menu-delete",
    title: "Delete Menu",
    element: MenuDeleteModal,
    force: false,
  },
  {
    name: "favorites",
    title: "My Favorites",
    element: FavoritesModal,
    force: false,
  },
];

export default modals;
