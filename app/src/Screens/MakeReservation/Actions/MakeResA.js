import { SET_DIALOGUE, LOAD_AVAILABLE_TIME_SLOTS, SET_SELECTED_SLOT, RESET_SELECTED_SLOT, MAKE_RESERVATION, RESET_MAKE_RESERVATION, CLEAR_AVAILABLE_TIME_SLOTS} from "../../../Commons/Constants";

export const loadAvailableTimeSlotsAction = (date, uuid) => {
    return {
      type:`${LOAD_AVAILABLE_TIME_SLOTS}`,
      date: date,
      uuid: uuid,
    }
  };

  export const clearAvailableTimeSlotsAction = () => {
    return {
      type:`${CLEAR_AVAILABLE_TIME_SLOTS}`,
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

  export const makeReservationAction = (date, instructor) => {
    return {
      type:`${MAKE_RESERVATION}`,
      date: date,
      instructor: instructor,
    }
  };

  export const resetmakeReservationAction = () => {
    return {
      type:`${RESET_MAKE_RESERVATION}`,
      makeReservMessage: undefined,
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