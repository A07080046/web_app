/**
 * 验证手机号
 * @param {Object} tel
 */
function testPhone(tel){
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	 if (reg.test(tel)) {
	     return true;
	 }else{
//			     document.getElementById("telPhone").focus();
	     return false;
	 };
}

/**
 * 获取单选框的值
 * @param {Object} RadioName
 */
function GetRadioValue(RadioName){
    var obj;   
    obj=document.getElementsByName(RadioName);
    if(obj!=null){
        var i;
        for(i=0;i<obj.length;i++){
            if(obj[i].checked){
                return obj[i].value;           
            }
        }
    }
    return null;
}

/**
 * 验证邮箱
*/
function checkEmail(str){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(re.test(str)){
        return true;
    }else{
        return false;
    }
}
/**
 * 验证身份证号码
 * @param {Object} card
 */
function isCardNo(card)  
{  
   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
   if(reg.test(card)){
   		return true;
   }else{
   		return false;
   }
   
}
/**
 * 验证工商执照号
 * @param {Object} str
 */
function isLicenseNo(str){
	var reg = /\d{15}/;
	if(reg.test(str)){
   		return true;
   }else{
   		return false;
   }
}
/**
 * 验证邮箱（包含@和.）
 * @param {Object} str
 */
function checkEmail(str){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(re.test(str)){
        return true;
    }else{
        return false;
    }
}
/**
 *  邮政编码的验证（开头不能为0，共6位）
 * @param {Object} str
 */
function checkZipcode(str){
	var re= /^[1-9][0-9]{5}$/
    if(re.test(str)){
      	return true;
    }else{
      return false;

    }
}
/**
 * 验证数字(包含小数点)
*/
function checkNum(str){
    var re = /^[0-9]+.?[0-9]*$/;
    if(re.test(str)){
        return true;
    }else{
        return false;
    }
}