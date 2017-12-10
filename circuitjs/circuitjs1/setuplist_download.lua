local file, err = io.open("setuplist.txt", "r")
    	
if file == nil then
   error(err)
end

local command = "rm -rf circuits && mkdir circuits"
local f = assert(io.popen(command, "r"))
f:close()

local line
repeat
    line = file:read("*line")
    
    if line and not line:find("^%#") and not line:find("^%+") and not line:find("^%-") then 
        print(line)
        
        local x,y = line:find(" ", 1, true)
        local command = "cd circuits && wget -nc http://lushprojects.com/circuitjs/circuitjs1/circuits/" .. line:sub(1, y)
        print("\t" .. command)
        
        local f = assert(io.popen(command, "r"))
        f:close()
    end
until not line

file:close()