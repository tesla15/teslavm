using System;
using System.Management;
using System.IO;

namespace installer
{
    internal class Program
    {
        public static string program_intro = "--- TeslaVM installator ---";
        public static bool debug = false;
        public static string path = Directory.GetCurrentDirectory();
        public static string user_want_to_change;
        static private bool IsValidPath(string path, bool allowRelativePaths = false)
        {
            bool isValid = true;

            try
            {
                string fullPath = Path.GetFullPath(path);

                if (allowRelativePaths)
                {
                    isValid = Path.IsPathRooted(path);
                }
                else
                {
                    string root = Path.GetPathRoot(path);
                    isValid = string.IsNullOrEmpty(root.Trim(new char[] { '\\', '/' })) == false;
                }
            }
            catch (Exception ex)
            {
                isValid = false;
            }

            return isValid;
        }

        static void Main(string[] args)
        {
            Console.SetCursorPosition((Console.WindowWidth - program_intro.Length) / 2, Console.CursorTop); //set cursor to center
            Console.Write(program_intro);
            Console.Write("\n\n"); // new line after intro

            if (IntPtr.Size == 4)
            {
                Console.WriteLine("[X] Sadly, you cant run TeslaVM officialy on x32 system");
                Environment.Exit(0);
            }

            Console.WriteLine("[?] Installation directory: " + path);
            Console.WriteLine("[?] Is this path ok? Y/N"); user_want_to_change = Console.ReadLine();
            if (user_want_to_change == "Y" || user_want_to_change == "y")
            {
                Console.WriteLine("[V] Alright!");
            }
            else
            {
                Console.WriteLine("[?] Let me know what path would you like ");
                path = Console.ReadLine();
                if (!IsValidPath(path))
                {
                    Console.WriteLine("[X] Doesnt look right, hmm...");
                    Console.WriteLine("[?] Give me path which exists!");
                    path = Console.ReadLine();
                } else
                {
                    Console.WriteLine(path + " [V] Looks good!");
                }
            }

            Console.WriteLine("[V] Attemping to download main-line TeslaVM files...");
            //download (no server yet)
            Console.WriteLine("[V] Checking if all files are there...");
            //check files
            Console.WriteLine("[V] Attemping to download & install HAXM");
            //check is amd cpu and return else download and install
            Console.WriteLine("[V] Finished, would you like to create desktop shortcut?");
            // create shortcut if user wants
            Console.WriteLine("[V] Exiting with code 0x0... ");
            Environment.Exit(0);
        }
    }
}
