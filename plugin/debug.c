#include <stdarg.h>
#include <stdio.h>

#include "config.h"
#include "debug.h"

#if defined(DEBUG)

void debug(const char *fmt, ...)
{
   FILE *file;
   va_list va;
   va_start(va, fmt);

#if defined(_WINDOWS)
   if (fopen("\\" PLUGIN_NAME ".log", "a")) {
      fprintf(file, "%s: ", PLUGIN_NAME);
      vfprintf(file, fmt, va);
      fprintf(file, "\n");
      fclose(file);
   }
#else
   fprintf(stderr, "%s: ", PLUGIN_NAME);
   vfprintf(stderr, fmt, va);
   fprintf(stderr, "\n");
   if (file = fopen("/tmp/" PLUGIN_NAME ".log", "a")) {
      fprintf(file, "%s: ", PLUGIN_NAME);
      vfprintf(file, fmt, va);
      fprintf(file, "\n");
      fclose(file);
   }
#endif

   va_end(va);
}

#endif