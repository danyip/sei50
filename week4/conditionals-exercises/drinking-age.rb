#
# Ask the user for their age.
#     Remember that anytime you get input, it is a string, so you will need to change the age input to a number.
# If age is less than 18, print an appropriate message.
# If the age is equal to or over 18, print a different message.

print "What is your age: "
user_age = gets.to_i
# user_age = user_age.to_i
# p "age is: ", user_age

if user_age < 18
  puts "Scram, kid! Go drink some cordial!"
else
  puts "Come on in and enjoy the liver damage!"
end
