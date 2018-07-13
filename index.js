import validator from 'validator';


export default validator;


export function nixCheckInput(checkerObject) {

	const newState = checkerObject.componentState;		// Storing the current state in a variable
	const componentStateErrorItem = (checkerObject.componentStateErrorItem) ? checkerObject.componentStateErrorItem : null;
	const componentStateSuccessItem = checkerObject.componentStateSuccessItem;
	let valid = checkerObject.validity;

	
	if(!componentStateErrorItem){

		insertValueInState(newState, componentStateSuccessItem, false)

	}
	else {

		if(valid){
			let transitState = insertValueInState(newState, componentStateSuccessItem, false);	// We have to save a transitState above as this step only inserts the success value into the state. It does not remove the error value from the state. That is done by the step below.

			return insertValueInState(transitState, componentStateErrorItem, true);
		}
		else {
			let transitState = insertValueInState(newState, componentStateErrorItem, false);

			return insertValueInState(transitState, componentStateSuccessItem, true);
		}

	}



	function insertValueInState(stateToUpdate, stateItemToUpdate, removeValue){

		let runLoop = true;

		let currentStateItem = stateToUpdate;		// currentStateItem is a moving reference to internal objects within the state object. We use this variable to go to every nested object within the state and finally update the error or success value.

		let currentTempItem = stateItemToUpdate;		// currentTempItem is a moving reference to internal objects within the componentStateErrorItem or componentStateSuccessItem objects. We will use this variable to go to every nested object within the respective object and find the error or success value to be passed to the state (newState).

		let currentTempItemKey, currentNestedTempItem, currentNestedStateItem;

		while(runLoop){

			currentTempItemKey = Object.keys(currentTempItem)[0];
			currentNestedTempItem = currentTempItem[currentTempItemKey];
			currentNestedStateItem = currentStateItem[currentTempItemKey];

			if(typeof currentNestedTempItem === 'object' && typeof currentNestedTempItem !== null){

				currentTempItem = currentNestedTempItem;
				currentStateItem = currentNestedStateItem;

			}
			else {
				
				if(removeValue){
					currentStateItem[currentTempItemKey] = "";
				}
				else{
					currentStateItem[currentTempItemKey] = currentNestedTempItem;		// This is the line that actually sets the value of the success or error item inside the state
				}

				runLoop = false;

			}

		}

		return stateToUpdate;

	}



}