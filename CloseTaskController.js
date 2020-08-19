({
    doInit : function(component, event, helper) {
        var action = component.get("c.closeTask");
        action.setParams({"taskId": component.get("v.recordId")});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                
                $A.get('e.force:refreshView').fire();
                var createRecordEvent = $A.get("e.force:createRecord");
                createRecordEvent.setParams({
                    "entityApiName": "Worklog__c"
                });
                createRecordEvent.fire();
                
                component.set("v.task", response.getReturnValue());
            }else {
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Something went wrong!"  
                });
                toastEvent.fire();
            }
        });
        
        $A.enqueueAction(action);
        
    },
    
})
