//React
import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';

//Redux
import { useSelector, useDispatch, Provider } from 'react-redux';
import { createStore, AnyAction, combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'

//Other
import structuredClone from '@ungap/structured-clone';
import { rejects } from 'assert';



//-------------------------
//Testing/System/DataSource
//-------------------------
var DATA_SOURCE = "CRM"
let href = window!.top!.location.href;
if(href.indexOf("127.") > -1 || href.indexOf("localhost") > -1) {
    DATA_SOURCE="TEST";
}
var CRM_TEST_MODE = 0;

//-------------------------
//Data Definitions
//-------------------------
class CCustomData {
    customdata1:string;
    customdata2:string;
    constructor(customdata1?:string, customdata2?:string) {
        if(customdata1) {
            this.customdata1 = customdata1;
        }
        if(customdata2) {
            this.customdata2 = customdata2;
        }
    };
}

//-------------------------
//Redux
//-------------------------
function reducerCustomData(customdata:CCustomData[] = new Array<CCustomData>(), action:AnyAction) {
    switch (action.type) {
        case "CUSTOMDATA/SETCUSTOMDATA":
            return {
                customdata: action.data1
            }
        default:
        return customdata;
    }
}

//const reduxStore = createStore(reducerCustomData as any);
const reduxStore = configureStore({ reducer: reducerCustomData });
//const reduxStore = configureStore(reducerCustomData as any);

//Save data to store
//dispatch({ type: "CUSTOMDATA/SETCUSTOMDATA", data1: data });

//Get data from store
//let customdata = useSelector((customdata: CCustomData[]) => customdata);
//let cdata1 = customdata.customdata1;


function CustomLib(props:any) {

    //-------------------------
    //State
    //-------------------------
    const [customState, setCustomState] = React.useState({ 
        statevar1: "",
        statevar2: ""
    });

    //-------------------------
    //Init
    //-------------------------

    //Get current record data
    let currentFntityId = (props.context.mode as any).contextInfo.entityId;
    let currentEntityTypeName = (props.context.mode as any).contextInfo.entityTypeName;
    let currentEntityRecordName = (props.context.mode as any).contextInfo.entityRecordName;

    //Get current control field values

    //Lookup Field Example
    //let lookupfield_currentValue = props.context.parameters.BoundLookupField.raw[0];
    //let lookupfield_currentId = lookupfield_currentValue.id;
    //let lookupfield_currentEntityType = lookupfield_currentValue.entityType;
    //let lookupfield_currentRecordName = lookupfield_currentValue.name;

    //Datetime Example
    //let dateval = context.parameters.date_input_property.raw?.toDateString();

    //Get PCF Config
    /*
    let config_fields:Array<string> = [];
    let config_lists:string = "";

    if(props.context.parameters.Fields.raw!=null) {
        config_fields = props.context.parameters?.Fields?.raw.split(",");
    }

    if(props.context.parameters?.Lists?.raw!=null) {
        config_lists = props.context.parameters?.Lists?.raw;
    }
    */

    //Load Metadata
    // TODO

    //Retrieve Multiple
    // TODO

    //Init Dispatch
    const dispatch = useDispatch();
    
    //Init panel data
    useEffect(() => {

        if(DATA_SOURCE=="TEST") {
            
            //Init test data
            setCustomState({"statevar1": "test123", "statevar2":"test123"});

            const testData:CCustomData[] = [
                {"customdata1":"1","customdata2":"test1"},
                {"customdata1":"2","customdata2":"test2"},
                {"customdata1":"3","customdata2":"test3"}
            ]
            
            dispatch({ type: "CUSTOMDATA/SETCUSTOMDATA", data1: testData });

        }
        else {

            //Load data from crm

        }

    }, []);

    //Get data from store
    let storeData1 = useSelector((customdata: any) => customdata);
    let showStoredata:any;
    if(storeData1!=null && storeData1.customdata!=null && storeData1.customdata.length>0) {
        showStoredata = (storeData1.customdata as Array<CCustomData>).map((item:CCustomData) => {
            return (
                <>
                    <div>{item.customdata1}</div><div>{item.customdata2}</div>
                    <br/><br/>
                </>
            );
        });
    }
    
    return (
        <>
            <div>
                Hello World!
                <br/>
                <br/>
                Statevar1: {customState.statevar1}
                <br/>
                <br/>
                {showStoredata}
            </div>
        </>
    );
}

export function Render(context:any, container:any, theobj:object) {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <div><CustomLib context={context} theobj={theobj} /></div>
        </Provider>
        , container
      );
}

