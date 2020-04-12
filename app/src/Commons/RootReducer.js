import { combineReducers } from 'redux';
import signInReducer from '../Screens/Splash/Reducers/SignInR';
import welcome1Reducer from '../Screens/Welcome1/Reducers/Welcome1R';
import checkboxReducer from '../Commons/CheckBox/checkBoxReducer';
import dialogueReducer from '../Commons/Dialogue/DialogueReducer';
import photoReducer from './PhotoReducer';
import signUpReducer from './SignUpReducer';
import mscReducer from '../Screens/MainStudent/Reducer/MSR';
import menudialogueReducer from '../Commons/MenuDialogue/MenuDialogueReducer';
import profiledialogueReducer from '../Commons/ProfileDialogue/ProfileDialogueReducer';

const createRootReducer  = () => combineReducers({
    signInReducer: signInReducer(),
    welcome1: welcome1Reducer(),
    checkboxReducer: checkboxReducer(),
    dialogueReducer: dialogueReducer(),
    photoReducer: photoReducer(),
    signUpReducer: signUpReducer(),
    mscreducer: mscReducer(),
    menudialogueReducer: menudialogueReducer(),
    profiledialogueReducer: profiledialogueReducer(),
});

export default createRootReducer ;