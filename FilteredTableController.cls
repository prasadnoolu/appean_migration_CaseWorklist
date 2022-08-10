/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-21-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/

public with sharing class FilteredTableController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(
        String caseNumber,
        String accountName,
        String contactName,
        String cat,
        String status,
        String typu,
        Integer v_pagesize,
        String errorMsg
        
    ) {
        String query;
        String condition = (String.isNotBlank(caseNumber)
            ? 'CaseNumber LIKE \'' + '%' + caseNumber + '%\''
            : '');

        condition += (String.isNotBlank(accountName)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Account.Name LIKE \'' +
              '%' +
              accountName +
              '%\''
            : '');

        condition += (String.isNotBlank(contactName)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Contact.Name LIKE \'' +
              '%' +
              contactName +
              '%\''
            : '');

        condition += (String.isNotBlank(cat)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Sub_Category_Type__c LIKE \'' +
              '%' +
              cat +
              '%\''
            : '');


        condition += (String.isNotBlank(status)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Status LIKE \'' +
              '%' +
              status +
              '%\''
            : '');

        condition += (String.isNotBlank(typu)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Case_Type__c LIKE \'' +
              '%' +
              typu +
              '%\''
            : '');


        System.debug('condition ' + condition);
        if (String.isNotBlank(condition))
         {
            query =
                'SELECT CaseNumber,Account.Name,Contact.Name,Case_Type__c,Sub_Category_Type__c,Status FROM Case  WHERE ' +
                condition +
                ' ORDER BY CaseNumber limit :v_pagesize';
                

        } 
        
        else
        {
            //query = 'SELECT CaseNumber,CaseNumber,Account.Name,Contact.Name,Case_Type__c,Sub_Category_Type__c,Status FROM Case ORDER BY CaseNumber limit :v_pagesize';
            query='';
            
            
        }

        List<Case> records = Database.query(query);
        
            return records;
        
             
        }


    
}
