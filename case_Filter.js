import { LightningElement, wire, api, track } from "lwc";
import getCases from "@salesforce/apex/FilteredTableController.getCases";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import TYPE_FIELD from "@salesforce/schema/Case.Case_Type__c";
import SUB_CAT from "@salesforce/schema/Case.Sub_Category_Type__c";



export default class FilteredTable extends NavigationMixin(LightningElement) 
{
    
    
    @track a='';
    @track v_pagesize='5';
    @track errorMsg = '';
    @track data;
    @track readOnlyBool=true;
    @track readOnlyBool2=true;
    searchable = [];
    wiredCases;
    doneTypingInterval = 0;
    statusPickListValues;
    categoryPickListValues;
    caseTypePickListValues;
    searchAllValue;
    caseNumber = "";
    accountName = "";
    contactName = "";
    cat = null;
    status = null;
    typu=null;
    


    

    get comboBoxOptions() {
        var pageLimitList = [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '50', value: '50' },
            { label: '100', value: '100' },
            { label: '500', value: '500' },
            { label: '1000', value: '1000' },
            { label: '5000', value: '5000' },
            { label: '10000', value: '10000' }

        ];
        return pageLimitList;
    }
 

    
    @wire(getCases, {
        caseNumber: "$caseNumber",
        accountName: "$accountName",
        contactName: "$contactName",
        cat: "$cat",
        status: "$status",
        typu: "$typu",
        v_pagesize:"$v_pagesize",
        errorMsg:"$errorMsg"
        
    })
    

    wiredSObjects(result) {
        console.log("wire getting called");
        this.wiredCases = result;
        
        if (result.data) {
            
            this.searchable = this.data = result.data.map((caseObj, index) => ({
                caseData: { ...caseObj },
                index: index + 1,
                rowIndex: index

                
            }));


           
           this.a=result.data.toString();
           if(this.a)
           {
            this.errorMsg='';
           }
           else
           {
            this.errorMsg="NO CASE RECORDS FOUND";

           }
            



        }
        
    

        
        


    }


    @wire(getPicklistValues, {
        recordTypeId: "012000000000000AAA",
        fieldApiName: STATUS_FIELD
    })
    statusPickLists({ error, data }) {
        if (error) {
            console.error("error", error);
            
        } else if (data) {
            this.statusPickListValues = [
                { label: "", value: null },
                ...data.values
            ];
        }
        
    }

    
    @wire(getPicklistValues, {
        recordTypeId: "012000000000000AAA",
        fieldApiName: SUB_CAT
    })
    categoryPickListPickLists({ error, data }) {
        if (error) {
            console.error("error", error);
            
        } else if (data) {
            this.categoryPickListValues = [
                { label: "", value: null },
                ...data.values
            ];
        }
    }
    
    

    @wire(getPicklistValues, {
        recordTypeId: "012000000000000AAA",
        fieldApiName: TYPE_FIELD
    })
    caseTypePickListValues({ error, data }) {
        if (error) {
            console.error("error", error);
            
        } else if (data) {
            
            this.caseTypePickListValues = [
                { 
                label: "", value: null },
                ...data.values
            ];
        }
    }
    



    
    handleChange(event) {
        this[event.target.name] = event.target.value;
        console.log("change", this[event.target.name]);
        this.readOnlyBool=false;

    }

    handleKeyUp(event) {
        clearTimeout(this.typingTimer);
        let value = event.target.value;
        let name = event.target.name;

        this.typingTimer = setTimeout(() => {
            this[name] = value;
        }, this.doneTypingInterval);
        this.readOnlyBool2=false;
    }

    clearSearch() {
        this.caseNumber = "";
        this.accountName = "";
        this.contactName = "";
        this.status = null;
        this.cat= null;
        this.typu=null;
        this.searchable = "";
        this.v_pagesize='5';
        this.searchAllValue = "";
        this.errorMsg='';
        this.readOnlyBool=true;
        this.readOnlyBool2=true;
    }

    handleLimitChange(event){
        this.pageNumber=1;
        this.v_pagesize=event.target.value;
        

    }

    
 
    handleNavigate(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                actionName: "view",
                recordId: event.target.dataset.id
                
            }
        });

        
    }


    
    
}
