import { SET_DIALOGUE, LOAD_AVAILABLE_TIME_SLOTS, LOAD_AVAILABLE_TIME_SLOTS_FAILURE, SET_SELECTED_SLOT, RESET_SELECTED_SLOT, MAKE_RESERVATION, RESET_MAKE_RESERVATION, SET_COST} from "../../../Commons/Constants";

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

  export const setSelectedTimeSlotAction = (index) => {
    return {
      type:`${SET_SELECTED_SLOT}`,
      selectedSlot: index,
    }
  };

  export const resetSelectedTimeSlotAction = () => {
    return {
      type:`${RESET_SELECTED_SLOT}`,
    }
  };

  export const showialogueAction = (negativeButtonPressed, message) => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: true,
      message: message,
      negative: 'OK',
      negativeButtonPressed: negativeButtonPressed,
    }
  };

  export const dialogueOKAction = () => {
    return {
      type:`${SET_DIALOGUE}`,
      visible: false,
      message: '',
      negative: undefined,     
      positive: undefined,
      negativeButtonPressed: undefined,
    }
  };

  export const setCostAction = (user, cost, currency) => {
    return {
      type:`${SET_COST}`,
      user: user,
      cost: cost,
      currency: currency,
    }
  };