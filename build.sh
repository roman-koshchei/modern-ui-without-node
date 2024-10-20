# build frontend
cd frontend
bun run build
cd ..

# build backend
cd backend
dotnet publish ./Backend.csproj -c Release 
cd ..

# combine results
DIR="./bin"
[ -d "$DIR" ] && rm -r "$DIR"
mv ./backend/bin/Release/net8.0/publish "$DIR"

[ -d "$DIR/wwwroot" ] && rm -r "$DIR/wwwroot"
mv ./frontend/dist "$DIR/wwwroot"
