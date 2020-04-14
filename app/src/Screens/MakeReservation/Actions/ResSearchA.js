import { LOAD_FEATURED_INSTRUCTORS, LOAD_SEARCH_RESULTS, SET_INSTRUCTOR_FOR_RESERVATION } from "../../../Commons/Constants";

export const loadFeaturedAction = () => {
    return {
      type:`${LOAD_FEATURED_INSTRUCTORS}`,
    }
  };

  export const loadSearchAction = (querry) => {
    return {
      type:`${LOAD_SEARCH_RESULTS}`,
      querry: querry,
    }
  };

  export const setInstructorAction = (instructor, instructorPhoto) => {
    return {
      type:`${SET_INSTRUCTOR_FOR_RESERVATION}`,
      instructor: instructor,
      instructorPhoto: instructorPhoto,
    }
  };