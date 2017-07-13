doubleMe x = x + x
doubleUs x y = doubleMe x + doubleMe y
doubleSmallNumber x = if x > 100
                                    then x
                                    else x*2
doubleSmallNumber' x = (if x > 100 then x else x*2) + 1
cat = "this is  a cat"

cats = ["cat","runzz","way"]
runs = ["eat","fish","play"]

ways = [cc ++ " " ++ rr | cc <- cats,rr <- runs]

length' xs = sum[1 | _ <- xs]


triangles = [(a,b,c) | c <- [1..10],b <- [1..10],a <- [1..10],a^2 + b^2 == c^2,a + b + c == 24]

removeSth :: String -> String
removeSth st = [c | c <- st, c `elem` ['A'..'Z']]

addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z

sayMe :: (Integral a) => a -> String
sayMe 1 = "One!"
sayMe 2 = "Two!"
sayMe 3 = "Three!"
sayMe 4 = "four!"
sayMe 5 = "five!"
sayMe x = "is not 1-5"

factorial :: (Integral a) => a -> a
factorial 0 = 1
factorial n = n * factorial(n-1)

addVectors :: (Num a) => (a,a) ->(a,a) -> (a,a)
addVectors (x1,y1) (x2,y2) = (x1 + x2,y1 + y2)

head' :: [a] -> a
head' [] = error "baka"
head' (x:xxx) = x

tell :: (Show a) => [a] -> String
tell [] = "The list is empty"
tell (x:[]) = "The list has one element: " ++ show x
tell (x:y:[]) = "The list has two elements: " ++ show x ++ " and " ++ show y
tell (x:y:_) = "This list is long. The first two elements are: " ++ show x ++ " and " ++ show y

length1' :: (Num b) => [b] -> b
length1' [] = 0
length1' (_:xs) = 1 + length' xs

sumNum :: (Num b) => [b] -> b
sumNum [] = 0
sumNum (x:xs) = x + sumNum xs

capital :: String -> String
capital "" = "Empty string, whoops!"
capital cat@(x:xs) = cat

bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | bmi <= skinny = "you are good"
    | bmi <= normal = "you are better"
    | bmi <= fatty = "you are bad"
    | otherwise  = "baka"
    where bmi = weight / height ^ 2
          (skinny, normal, fatty) = (18.5, 25.0, 30.0)

describeList :: [a] -> String
describeList xs = "The list is " ++ what xs
    where what [] = "empty."
          what [x] = "a singleton list."
          what xs = "a longer list."


maxNum :: (Ord a) => [a] -> a
maxNum [] = error "you are a foolish"
maxNum [x] = x
maxNum (x:xs)
    | x > maxMul = x
    | otherwise = maxMul
    where maxMul = maxNum xs






