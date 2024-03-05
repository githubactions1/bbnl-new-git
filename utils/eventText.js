
/**************************************************************************************
* method         : prcs_tmplte
* Parameters     : element template , data
* Description    : Process Json template based on data
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.buildMessage = function (msg_template, data) {
    let tmplt = '';
    if (msg_template = "install") {
        tmplt = 'Installation done for CAF $$id$$'
    }
    let msg_tx = ''
    Object.keys(data).forEach(function (k) {
        msg_tx = tmplt.replace("$$" + k + "$$", data[k]);
    });
    return msg_tx;
}

// Testing template

//var install_tmplte = 'Installation done for CAF $$id$$'
