import { CONSTANTS } from "./constants";
import { SERVER_URL } from "./constants";

/*
  ! NOTE: 
   If using local server, 
   just uncomment the variables in each async dispatch
   then pass the url into fetch
*/

// fetch list of all users
export const requestAllUsers = () => async (dispatch) => {
  // const url = "http://localhost:3001/leaderboard";
  dispatch({ type: CONSTANTS.REQUEST_ALL_USERS_PENDING});
  try {
    const respAllUsers = await fetch(SERVER_URL.LEADERBOARD);
    const respUserData = await respAllUsers.json();
    dispatch({ type: CONSTANTS.REQUEST_ALL_USERS_SUCCESS, payload: respUserData})
  } catch (error) {
    dispatch({ type: CONSTANTS.REQUEST_ALL_USERS_FAILED, payload: error})
  }
}

// set user reg input
export const setRegPassword = (text) => { return { type: CONSTANTS.CHANGE_REG_PW_FIELD, payload:text}}
export const setRegUsername = (text) => { return { type: CONSTANTS.CHANGE_REG_USERNAME_FIELD, payload:text}}
export const setRegEmail = (text) => { return { type: CONSTANTS.CHANGE_REG_EMAIL_FIELD, payload:text}}

export const register = (email, username, password) => async (dispatch) => {
  // const url = "http://localhost:3001/register";
  
  dispatch({ type: CONSTANTS.USER_REG_PENDING});
  try {
    const respReg = await fetch(SERVER_URL.REGISTER, 
      {
      method:"POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({email,username,password})
    });
    const respData = await respReg.json();
    if (!respData.hasOwnProperty("error")) {
      dispatch({
        type: CONSTANTS.USER_REG_SUCCESS,
        payload: respData
      });
    } else {
      dispatch({
        type: CONSTANTS.USER_REG_FAILED,
        payload: respData.error
      });
    }
  } catch (error) {
    dispatch({
      type: CONSTANTS.USER_REG_FAILED,
      payload: error.message
    });
  }
}

// USER SIGN FORM
export const setUsernameText = (text) => { return { type: CONSTANTS.CHANGE_SIGN_USERNAME_FIELD, payload: text } }
export const setPasswordText = (text) => { return { type: CONSTANTS.CHANGE_SIGN_PW_FIELD, payload: text } }

export const signIn = (username, password) => async (dispatch) => {
  // const url = "http://localhost:3001/sign_in";
  dispatch({type: CONSTANTS.USER_SIGN_PENDING});
  try {
    const respSign = await fetch(SERVER_URL.SIGN_IN, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    });
    const respData = await respSign.json();
    //! check if the response does not return JSON prop, validate details on B.E.
    if(!respData.hasOwnProperty("error")) {
      dispatch({
        type: CONSTANTS.USER_SIGN_SUCCESS,
        payload: respData
      });
    } else {
      dispatch({
        type: CONSTANTS.USER_SIGN_FAILED,
        payload: respData.error
      });
    }
  } catch(error) {
    dispatch({
      type: CONSTANTS.USER_SIGN_FAILED,
      payload: error.message
    });
  }
}

export const logUserOut = () => {
  return {
    type: CONSTANTS.USER_LOG_OUT,
    payload: {},
  }
}
// UPDATE USER SCORE
export const updateUserScore = (id) => async (dispatch) => {
  // const url = "http://localhost:3001/score";
  try {
    const respScore = await fetch(SERVER_URL.SCORE, {
      method:"put",
      headers: { "Content-Type":"application/json"},
      body: JSON.stringify({id})
    });
    const respData = await respScore.json();
    dispatch({
      type:CONSTANTS.UPDATE_SCORE,
      payload: respData
    })
  } catch {
    dispatch({
      type: CONSTANTS.UPDATE_SCORE_FAILED,
      payload: 0,
    })
  }
}

// ACTION FOR MODAL 
export const closeModal = () => {
  return {
    type: CONSTANTS.CLOSE_SCORE,
    payload: false
  }
}

// ACTION FOR EPISODES
export const playCurrentEpisode = (episode) => {
  return {
    type: CONSTANTS.PLAY_CURRENT_EPISODE,
    payload: episode
  }
}

export const displayMediaPlayer = () => {
  return {
    type: CONSTANTS.SHOW_PLAYER,
    payload: true
  }
}

// ACTION FOR HANDLING API REQ + SEARCH PARAMS
export const setSearchField = (text) => {
  return {
     type: CONSTANTS.CHANGE_SEARCH_FIELD,
     payload: text
  }
}

export const requestRandomEpisode = () => async (dispatch) => {
  // Fetch from backend
  // const SERVER_URL_RANDOM = "http://localhost:3001/random_episode";
  dispatch({type: CONSTANTS.REQUEST_RAND_EPISODE_PENDING}); 
  try {
    const resp = await fetch(SERVER_URL.RAND_EPISODE);
    const respData = await resp.json();
    setTimeout(() => { //! this can be removed, left in to show loader effect
      dispatch({
        type: CONSTANTS.REQUEST_RAND_EPISODE_SUCCESS,
        payload: respData
      })
    }, 1000);
    
  } catch(error) {
    dispatch({
      type:CONSTANTS.REQUEST_RAND_EPISODE_FAILED,
      payload:error
    })
  }
}

export const requestEpisodes = (urlSearch, urlOffset) => async (dispatch) => {
  // const SERVER_URL_EPISODE='http://localhost:3001/episodes';
  const urlParams = {
    urlSearch,
    urlOffset
  };

  /*
    1. POST user query from clicking 'search'
    2. Pass urlObj to body 
    3. Express makes GET request to external API (listennotes)
    4. Returns response
  */
  dispatch({ type: CONSTANTS.REQUEST_EPISODE_PENDING });
  try {
    const resp = await fetch(SERVER_URL.EPISODES, {
      method:'post',
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(urlParams)
    })
    const respData = await resp.json();
    dispatch({
        type:CONSTANTS.REQUEST_EPISODE_SUCCESS,
        payload:respData
      })
  } catch(error) {
     dispatch({
        type:CONSTANTS.REQUEST_EPISODE_FAILED,
        payload: error
      })
  }
}