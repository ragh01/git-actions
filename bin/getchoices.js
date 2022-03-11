var choices = [];
var variable_name = 'workspace_name';
var limit = 100;

var query_str = 'name=' + variable_name;
var gr_ion = new GlideRecord('item_option_new');
gr_ion.addEncodedQuery(query_str);
gr_ion.setLimit(limit);
gr_ion.query();

if (gr_ion.hasNext()) {
while(gr_ion.next()) {
    var gr_cart = new sn_sc.CatItem(gr_ion.cat_item);
    var variableList = gr_cart.getVariables();
    variableList.forEach(function(data, index) {
        if(variable_name == data.name) {
        gs.log('data.name:'+data.name)
        gs.log('gr_ion.sysid:'+gr_ion.sys_id)
        gs.log('gr_ioncat_item:'+gr_ion.cat_item)
        var qc = new GlideRecord('question_choice');
        qc.addQuery('question', gr_ion.sys_id.toString());
        qc.query();
        while(qc.next()){
            choices.push(qc.value.toString())
        }
        }
    });
}
}

gs.log(JSON.stringify(choices));
