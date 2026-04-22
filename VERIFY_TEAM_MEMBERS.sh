#!/bin/bash

echo "🔍 TEAM MEMBERS INTEGRATION VERIFICATION"
echo "========================================\n"

# 1. Check backend
echo "1️⃣  Checking Backend Status..."
HEALTH=$(curl -s http://localhost:8000/api/health | jq -r '.status' 2>/dev/null)
if [ "$HEALTH" = "OK" ]; then
    echo "   ✅ Backend is running\n"
else
    echo "   ❌ Backend is NOT running"
    echo "   Fix: Run 'npm run dev' in nextWebSolutions_backend/\n"
    exit 1
fi

# 2. Check database
echo "2️⃣  Checking Team Members in Database..."
TEAM_COUNT=$(curl -s http://localhost:8000/api/team | jq '.data | length' 2>/dev/null)
echo "   📊 Total team members: $TEAM_COUNT"
if [ "$TEAM_COUNT" -ge 3 ]; then
    echo "   ✅ Database has team members\n"
else
    echo "   ⚠️  Database has less than expected"
    echo "   Fix: Run 'node seed-team-members.js' in nextWebSolutions_backend/\n"
fi

# 3. Show team members
echo "3️⃣  Team Members Data:"
curl -s http://localhost:8000/api/team | jq '.data[] | {name: .name, role: .role, avatar: .avatar_initials, color: .avatar_color}'
echo ""

# 4. Check frontend file exists
echo "4️⃣  Checking Frontend Files..."
if [ -f "/Users/sahilijaz/Desktop/NextWeb/NextWeb/next_frontend/index.html" ]; then
    echo "   ✅ Frontend index.html exists"
else
    echo "   ❌ Frontend index.html missing"
    exit 1
fi

if [ -f "/Users/sahilijaz/Desktop/NextWeb/NextWeb/next_frontend/script.js" ]; then
    echo "   ✅ Frontend script.js exists"
else
    echo "   ❌ Frontend script.js missing"
    exit 1
fi
echo ""

# 5. Check for loadTeamMembers function
echo "5️⃣  Checking Frontend Integration..."
if grep -q "loadTeamMembers" /Users/sahilijaz/Desktop/NextWeb/NextWeb/next_frontend/script.js; then
    echo "   ✅ loadTeamMembers() function found"
else
    echo "   ❌ loadTeamMembers() function NOT found"
    exit 1
fi

if grep -q "populateTeamMembers" /Users/sahilijaz/Desktop/NextWeb/NextWeb/next_frontend/script.js; then
    echo "   ✅ populateTeamMembers() function found"
else
    echo "   ❌ populateTeamMembers() function NOT found"
    exit 1
fi
echo ""

echo "✅ ALL CHECKS PASSED!"
echo ""
echo "📋 Next Steps:"
echo "1. Open: http://localhost:3000/next_frontend/index.html"
echo "2. Scroll to 'Meet Our Experts' section"
echo "3. You should see 3 team member cards"
echo "4. Open DevTools (F12) to check for errors"
echo ""
echo "🎯 Expected Team Members:"
echo "   - Abdullah Alvi (React Developer and UI/UX)"
echo "   - Abdul Manan (Founder and Lead)"
echo "   - Sahil Ijaz (Backend Specialist)"
