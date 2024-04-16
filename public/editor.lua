local plr = game:GetService("Players")

if syn then
print("Synapse")
getgenv().WebSocket = syn.websocket
elseif KRNL_LOADED then
print("Krnl")
getgenv().WebSocket = Krnl.WebSocket
end

print("Wait a few seconds for the WebSocket to connect.")
print("If it's not connecting after 15 seconds or more , re-execute.")

local Socket = WebSocket.connect("wss://editor.unithub.xyz/test")
print("Connected , Enjoy.")

Socket.OnMessage:Connect(function(msg)
    local function a(msg)
game.StarterGui:SetCore("ChatMakeSystemMessage",
  { Text = "["..msg.."]",
 Color = Color3.fromRGB( 255,255,255 ),
 Font = Enum.Font.Cartoon,
 FontSize = Enum.FontSize.Size24 }
 )
end
        warn("Ran from editor.unithub.xyz")
    a("Ran from editor.unithub.xyz")
        local l = loadstring(msg)
        l()
end)

Socket.OnClose:Connect(function()
local m = messagebox("The Connection was closed , reconnect?","unithub.xyz",4)
    if m == 6 then
      warn("Reconnecting in 15 Seconds.")
      wait(15)
      loadstring(game:HttpGet("https://editor.unithub.xyz/editor.lua"))()
    elseif m == 7 then
      warn("ok bye")
    end
end)

--sex