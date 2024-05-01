import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export default function AddCabin() {
//   const [isOpenModel, setisOpenModel] = useState(false);
//
//   return (
// <div>
{
  /* {" "} */
}
{
  /* <Button onClick={() => setisOpenModel((show) => !show)}> */
}
{
  /* Add new Cabin */
}
{
  /* </Button> */
}
{
  /* {isOpenModel && ( */
}
// <Modal OnClose={() => setisOpenModel(false)}>
{
  /* <CreateCabinForm OnCloseModal={() => setisOpenModel(false)} /> */
}
{
  /* </Modal> */
}
//   )}
{
  /* </div> */
}
//   );
// }
export default AddCabin;
