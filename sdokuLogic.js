// SDOKU LOGIC
$('.sdoku2-box').keyup(function logicCheck(){
    // 1~4의 값 입력
    if($(this).val()>4 || $(this).val()<1){
        alert('1~4의 값만 입력할 수 있습니다.')
        $(this).val(null);
        $(this).focus;
        return false;
    }
    // 여기서 parent, children, class이름을 이용해 로직 구현
    var inputValue = $(this).val();
    var inputParent = $(this).parent();
    var inputClassName = $(this).prop('className');
    var inputClassNameRow = inputClassName.split(" ")[2];
    var inputClassNameCol = inputClassName.split(" ")[3];
    var inputParentClassName = inputParent.prop('className');
    var inputParentClassNameRow = inputParentClassName.split(" ")[1];
    var inputParentClassNameCol = inputParentClassName.split(" ")[2];
    var isBoxCollect = true;
    // 같은 칸 안의 다른 요소들과 값 비교
    inputParent.children().each(function(){
        if(inputClassName !== $(this).prop('className')){
            if(inputValue == $(this).val()) isBoxCollect = false;
        }
    })
    if(!isBoxCollect){
        $(this).css('color','red')
    }
    else $(this).css('color','black')

    // className 을 이용해야 하므로 children, parents는 한계가 있어
    // find를 통해 className을 탐색해 값을 모두 비교.
    // 가로 로직은 row, row-box 로 비교
    // 세로 로직은 col, col-box 로 비교
    // class name을 추출해 split으로 배열을 만들어 같은 원소를 지닌 class를 비교!
    var grand = inputParent.parent();
    // Row Check
    var isRowCollect = true;
    grand.find('input').each(function(){
        if($(this).val()==='') return true;
        var parent = $(this).parent();
        var className = $(this).prop('className')
        var classNameRow = className.split(" ")[2];
        var parentClassName = parent.prop('className')
        var parentClassNameRow = parentClassName.split(" ")[1];
        if(inputClassNameRow !== classNameRow) return true;
        if(inputParentClassNameRow !== parentClassNameRow) return true;
        if(inputClassName === className) return true;
        if($(this).val() === inputValue) isRowCollect = false;
    })
    if(!isRowCollect){
        $(this).css('color','red')
    }
    // Col Check
    var isColCollect = true;
    grand.find('input').each(function(){
        if($(this).val()==='') return true;
        var parent = $(this).parent();
        var className = $(this).prop('className')
        var classNameCol = className.split(" ")[3];
        var parentClassName = parent.prop('className')
        var parentClassNameCol = parentClassName.split(" ")[2];
        if(inputClassNameCol !== classNameCol) return true;
        if(inputParentClassNameCol !== parentClassNameCol) return true;
        if(inputClassName === className) return true;
        if($(this).val() === inputValue) isColCollect = false;
    })
    if(!isColCollect){
        $(this).css('color','red')
    }
    
});
// 여기까지 로직 구현 완성.