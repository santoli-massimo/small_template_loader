
export var TemplateParser = {

    load:(source, template_name = null)=>{
            // PATTERN:
            // (?:(?:aaa(.*?)(?=xxx)xxx))|(?:(?:aaa(.*)(?!xxx)))
            // (?:(?:^\s*\[aaa\]\s*$(.*?)(?=^\s*\[.*\]\s*$)^\s*\[.*\]\s*$))|(?:(?:^\s*\[aaa\]\s*$(.*)(?!^\s*\[.*\]\s*$)))
            if(template_name){
                // Create Regex
                let open = `^\\s*\\[${template_name}\\]\\s*$`
                let close = `^\\s*\\[.*?\\]\\s*$`
                let reg = new RegExp(`(?:(?:${open}([\\s\\S]*?)(?=${close})${close}))|(?:(?:${open}([\\s\\S]*)(?!${close})))`
                , 'gimu')

                // let open = `^\\s*\\[${template_name}\\]\\s*$`
                // let close = `^\\s*\\[.*?\\]\\s*$`  
                // let reg = new RegExp(`(?:(?:${open}(.*?)(?=${close})${close}))|(?:(?:${open}(.*)(?!${close})))`, 'gimus')    
                
                let single = reg.exec(source) //?
                return single ? (single[1] || single[2]) : ''
            }
            else {
                // Create Regex
                let reg_all = new RegExp(`^\\s*\\[(\\w+)\\]\\s*$`, 'gimus')
                // Split template by Regex
                let split = source.split(reg_all);
                // Turn it into a dictionary
                let all = split.reduce(
                    (a,e,k,l)=>((!k||k&1)||(a[l[k-1].replace(/\[|\]/g,'')]=e))&&a
                ,{});
                return all
            }
    }

}