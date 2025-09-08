$(function(){ 

    //dropdown

    $('[data-dropdown]').click(function(){
        $(this).find('.dropdown-menu').toggle();
    })

    $(document).click(function(event) {
        if (!$(event.target).closest('[data-dropdown]').length) {
            $('.dropdown-menu').hide();
        }
    });

    //selct2

    $("select.form-control").select2();
    $("select.dropdown-select").select2({
        dropdownParent: '.dropdown-select-menu'
    });
    

    // datepicker
    
    $('input.date-range').each(function() {
        var allTimeLabel = 'All Time';
        var ranges = {
            'All Time': [moment().subtract(10, 'years'), moment()],
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Tomorrow': [moment().add(1, 'days'), moment().add(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };
        $(this).daterangepicker({
            autoUpdateInput: false,
            ranges: ranges,
            locale: {
                cancelLabel: 'Clear'
            },
            startDate: ranges[allTimeLabel][0],
            endDate: ranges[allTimeLabel][1],
            showDropdowns: true,
            alwaysShowCalendars: true,
            showCustomRangeLabel: false
        });

        $(this).val('');

        $(this).on('apply.daterangepicker', function(ev, picker) {
            if (picker.chosenLabel === allTimeLabel) {
                $(this).val('');
            } else {
                $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
            }
        });

        $(this).on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });
    });

    $('input.date').each(function() {
        $(this).daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            },
            showDropdowns: false,
            alwaysShowCalendars: false,
            showCustomRangeLabel: false,
            singleDatePicker: true,
        });

        $(this).val('');

        $(this).on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
        });

        $(this).on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });
    });

    // Table

    $('#teamLeadTable').DataTable({
        fixedColumns: {
            start: 1,
        },
        searching: false,
        ordering: false,
        info: false,
        paging: false,
        scrollX: true,
        scrollY: 300
    });

    //

    $('.aside-collapse-btn').click(function() {
        $(this).toggleClass('collapse');
        $('aside').toggleClass('collapse');
    });       

    // Model

    var zIndexCounter = 7;

    $('.close-dialog').click(function() {
        var dialog = $(this).closest('dialog')[0];
        if (dialog) {
            dialog.close();
        }
    }); 

    $('[data-dialog]').click(function() {
        var dialogValue = $(this).data('dialog');
        var dialog = $('dialog[data-model="' + dialogValue + '"]')[0];
    
        if (dialog) {
            zIndexCounter++;
            $(dialog).css('z-index', zIndexCounter);
            dialog.show();
        }
    });

    $('dialog').on('click', function(event) {
        if (event.target === this) {
            if (this.open) {
                this.close();
                zIndexCounter = 7;
                $('dialog').css('z-index', zIndexCounter);
            }
        }
    });

    // 

    $('.tab-nav .nav-li-tb').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    })

    // 

    $('[data-copy]').click(function(){
        var copyText = $(this).data('copy');
        if (copyText) {
            navigator.clipboard.writeText(copyText).then(function() {
                message('copied!','success');
            }).catch(function(error) {
                console.error('Error copying text to clipboard:', error);
            });
        }
    })

    // 

    $('input[type="file"].form-control').on('change', function () {
        var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
        if (fileName) {
            $(this).css('--filenameinitial', `"${fileName}"`);
        } else {
            $(this).css('--filenameinitial', 'var(--filename)');
        }
    });
})

function showtab(attr, tab) {
    $(`[data-${attr}]`).not(`[data-${attr}="${tab}"]`).hide();
    $(`[data-${attr}="${tab}"]`).show();
}

function message(message, type) {
    $('.message-pop').remove();
    var messageDiv = $(`<div class="message-pop ${type}">
                            <p>${message}</p>
                            <button type="button" class="close-btn">
                                <i class="iconify" data-icon="material-symbols-light:close"></i>
                            </button>
                        </div>`);

    $('body').append(messageDiv);
    
    setTimeout(function() {
        messageDiv.remove();
    }, 5000);
    
    messageDiv.find('.close-btn').on('click', function() {
        messageDiv.remove();
    });
}