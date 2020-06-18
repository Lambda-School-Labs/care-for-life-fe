import {
  RESET_RESPONSES,
  RESET_STAGED_RESPONSES,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_LOADING,
  GET_SURVEY_FAILURE,
  ADD_RESPONSE,
  STAGE_RESPONSES,
  SET_CURRENT_FAM,
  SET_CURRENT_INDIVIDUAL,
  CREATE_COMPLETED_SURVEY_LOADING,
  CREATE_COMPLETED_SURVEY_SUCCESS,
  CREATE_COMPLETED_SURVEY_FAILURE,
} from "../actions/surveyActions.js";

let initialState = {
  /// current dependant state
  currentFamily: null,
  currentIndividual: null,
  currentCompSurvey: null,
  /// created completed survey to post responses to
  compSurveyLoading: false,
  compSurveyError: null,
  /// survey questions loaded
  survey_questions: [],
  surveyError: null,
  loadingSurvey: false,
  /// responses before they are staged
  responses: [],
  /// staged responses/ready for map and post
  stagedResponses: [],
};

export default surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_RESPONSES:
      console.log("resetting responses");
      return {
        ...state,
        responses: action.payload,
      };
    case RESET_STAGED_RESPONSES:
      console.log("resetting staged responses");
      return {
        ...state,
        stagedResponses: action.payload,
      };
    case GET_SURVEY_LOADING:
      console.log("loading survey");
      return {
        ...state,
        loadingSurvey: true,
      };
    case GET_SURVEY_SUCCESS:
      console.log("survey loaded successfully");
      return {
        ...state,
        survey_questions: action.payload,
        loadingSurvey: false,
      };
    case GET_SURVEY_FAILURE:
      console.log("survey failed to load");
      return {
        ...state,
        loadingSurvey: false,
        surveyError: action.payload,
      };
    case ADD_RESPONSE:
      console.log("adding response");
      return {
        ...state,
        responses: [...state.responses, action.payload],
      };
    case STAGE_RESPONSES:
      console.log("staging response");
      return {
        ...state,
        stagedResponses: [...state.stagedResponses, ...action.payload],
      };
    case SET_CURRENT_FAM:
      console.log("setting current fam");
      return {
        ...state,
        currentFamily: action.payload,
      };
    case SET_CURRENT_INDIVIDUAL:
      console.log("setting current individual");
      return {
        ...state,
        currentIndividual: action.payload,
      };
    case CREATE_COMPLETED_SURVEY_LOADING:
      console.log("creating completed survey");
      return {
        ...state,
        compSurveyLoading: true,
        compSurveyError: null,
      };
    case CREATE_COMPLETED_SURVEY_SUCCESS:
      console.log("created completed survey successfully");
      console.log("comp survey payload:", action.payload);
      return {
        ...state,
        currentCompSurvey: action.payload,
        compSurveyLoading: false,
        compSurveyError: null,
      };
    case CREATE_COMPLETED_SURVEY_FAILURE:
      console.log("failed to create completed survey");
      return {
        ...state,
        compSurveyLoading: false,
        CompSurveyError: action.payload,
      };
    default:
      return state;
  }
};
