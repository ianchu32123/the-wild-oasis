import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSetting } from "./useSetting";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  // 從 useSetting 鉤子中獲取設置，並確保在解構之前對其進行初始化
  const { isLoading, settings } = useSetting();
  const {
    minbookinglength,
    maxbooknglength,
    maxGuestperBooking,
    breakfastPrice,
  } = settings || {};

  const { isUpdating, updateSetting } = useUpdateSetting();

  // 如果正在加載，則顯示 Spinner
  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) {
      return;
    } else {
      updateSetting({ [field]: value });
    }
  }

  // 渲染表單
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minbookinglength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minbookinglength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxbooknglength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxbooknglength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestperBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestperBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
