import { LOAD_AVAILABLE_TIME_SLOTS, LOAD_AVAILABLE_TIME_SLOTS_FAILURE} from "../../../Commons/Constants";

export const loadAvailableTimeSlotsAction = (date, uuid) => {
    return {
      type:`${LOAD_AVAILABLE_TIME_SLOTS}`,
      date: date,
      uuid: uuid,
    }
  };

  export const clearAvailableTimeSlotsAction = () => {
    return {
      type:`${LOAD_AVAILABLE_TIME_SLOTS_FAILURE}`,
    }
  };