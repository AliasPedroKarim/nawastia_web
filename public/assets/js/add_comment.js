(function ($) {
    $('.comment-message').click(function (e) {
        e.preventDefault();

        var contexte_form = $(this).parent().parent().find("form").attr('name');
        var contexte_form_id = $(this).parent().parent().find("form").attr('id');

        if (contexte_form === undefined){
            return false;
        } else {
            var form = document.forms.namedItem(contexte_form);
            var oOutput = document.querySelector("div"),
                oData = new FormData(form);

            oData.append("add_comment", "true");

            var oReq = new XMLHttpRequest();
            oReq.open("POST", `${$("#" + contexte_form_id).attr('action')}`, true);
            oReq.onload = function(oEvent) {


                var data = JSON.parse(oReq.response)

                console.log(data[0].data);

                var alert = '';

                if (data[0].error === false){
                    alert = 'success';
                }else{
                    alert = 'danger';
                }

                if (oReq.status == 200) {
                    if (alert && data[0].message){
                        if (data[0].message !== false){
                            $('body').append(displayAlert(data[0].message, alert));
                        }
                    }
                    if (data[0].data) {
                        $('#new-activites').html(data[0].data)
                    }
                    if (data[0].script) {
                        $('#script_add_comment').html(data[0].script)
                    }
                } else {
                    if (alert && data[0].message){
                        $('body').append(displayAlert("Attention ! Mise à jour de photo de profil incomplete <br>" +
                            "Une erreur a été detecté !", 'danger'));
                    }
                }
            };

            oReq.send(oData);
        }
        return false;
    })
})(jQuery)